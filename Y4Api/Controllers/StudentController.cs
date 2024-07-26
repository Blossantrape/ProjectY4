using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Y4Api.Data;
using Y4Api.Model;

namespace Y4Api.Controllers;

[ApiController]
[Route("api/[controller]")]
// api/Students
public class StudentController:ControllerBase
{
    private readonly AppDbContext _context;
    
    public StudentController(AppDbContext context)
    {
        _context = context;
    }

    // Создание студента.
    [HttpGet]
    public async Task<IEnumerable<Student>> GetStudents()
    {
        var students = await _context.Students.AsNoTracking().ToListAsync();
        return students;
    }

    // Получить всех студентов.
    [HttpPost]
    public async Task<IActionResult> Create(Student student)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        await _context.AddAsync(student);
        var result = await _context.SaveChangesAsync();
        if (result > 0)
        {
            return Ok();
        }

        return BadRequest();
    }

    // Получить студента по ID.
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Student>> GetStudent(int id)
    {
        var student = await _context.Students.FindAsync(id);

        if (student is null)
            return NotFound();
        
        return Ok(student);
    }

    // Удалить студента по ID.
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var student = await _context.Students.FindAsync(id);

        if (student is null)
            return NotFound();
        _context.Remove(student);

        var result = await _context.SaveChangesAsync();
        if (result > 0)
            return Ok("Student deleted");
        return BadRequest("Unable to delete student");
    }

    // Изменить данные студента по ID.
    [HttpPut("{id:int}")]
    public async Task<IActionResult> EditStident(int id, Student student)
    {
        var studentFromDB = await _context.Students.FindAsync(id);

        if (studentFromDB is null)
        {
            return BadRequest("Student not found");
        }
        
        studentFromDB.Name = student.Name;
        studentFromDB.Address = student.Address;
        studentFromDB.Email = student.Email;
        studentFromDB.PhoneNumber = student.PhoneNumber;
        
        var result = await _context.SaveChangesAsync();

        if (result > 0)
        {
            return Ok("Student updated");
        }
        
        return BadRequest("Unable to update student");
    }
}