using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Data;
using TaskManagerAPI.DTOs;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    private int GetUserId() =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    /// <summary>Get all tasks for the logged-in user</summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskResponseDto>>> GetTasks()
    {
        var tasks = await _context.Tasks
            .Where(t => t.UserId == GetUserId())
            .Select(t => new TaskResponseDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                IsCompleted = t.IsCompleted,
                CreatedAt = t.CreatedAt
            })
            .ToListAsync();

        return Ok(tasks);
    }

    /// <summary>Get a single task by ID</summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<TaskResponseDto>> GetTask(int id)
    {
        var task = await _context.Tasks
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == GetUserId());

        if (task == null) return NotFound();

        return Ok(new TaskResponseDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            IsCompleted = task.IsCompleted,
            CreatedAt = task.CreatedAt
        });
    }

    /// <summary>Create a new task</summary>
    [HttpPost]
    public async Task<ActionResult<TaskResponseDto>> CreateTask(TaskDto dto)
    {
        var task = new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,
            IsCompleted = dto.IsCompleted,
            UserId = GetUserId()
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        var response = new TaskResponseDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            IsCompleted = task.IsCompleted,
            CreatedAt = task.CreatedAt
        };

        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, response);
    }

    /// <summary>Update an existing task</summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, TaskDto dto)
    {
        var task = await _context.Tasks
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == GetUserId());

        if (task == null) return NotFound();

        task.Title = dto.Title;
        task.Description = dto.Description;
        task.IsCompleted = dto.IsCompleted;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>Delete a task</summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var task = await _context.Tasks
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == GetUserId());

        if (task == null) return NotFound();

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
