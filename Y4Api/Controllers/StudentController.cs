using Microsoft.AspNetCore.Mvc;

namespace Y4Api.Controllers;

[ApiController]
[Route("api/[controller]")]
// api/Students
public class StudentController:ControllerBase
{
    [HttpGet]
    public string SayHi()
    {
        return "Hi";
    }
}