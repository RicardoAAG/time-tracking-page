using System.Text.Json;
using TimeFollowingApp.backend.Models;

public class ActivityRepository : IActivityRepository
{
    private readonly List<ActivityModel> _activities = new();

    public ActivityRepository(IWebHostEnvironment env)
    {
        string filePath = Path.Combine(env.ContentRootPath, "Data", "activities.json");

        if (File.Exists(filePath))
        {
            string jsonContent = File.ReadAllText(filePath);
            
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            _activities = JsonSerializer.Deserialize<List<ActivityModel>>(jsonContent, options) 
                          ?? new List<ActivityModel>();
        }
    }

    public IEnumerable<ActivityModel> GetAll() => _activities;
}