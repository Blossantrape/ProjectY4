using System.Text.Json;

namespace Y4Api.AMapper;

public class CustomNamingPolicy : JsonNamingPolicy
{
    public override string ConvertName(string name)
    {
        return char.ToUpper(name[0]) + name.Substring(1);
    }
}