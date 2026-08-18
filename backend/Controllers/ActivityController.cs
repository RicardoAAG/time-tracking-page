using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.InteropServices;
using TimeFollowingApp.backend.Models;

namespace TimeFollowingApp.backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ActivityController : ControllerBase
    {
        private static IEnumerable<ActivityModel> activities = new[]{
            new ActivityModel
        // public int Id { get; set; }
        // public int ActivityType { get; set; }
        // public string? Name { get; set; }
        // public List<AchievementModel> AchievementsByDate { get; set; } = new();
            // public int Id { get; set; }
            // public int ActivityId { get; set; }
            // public DateTimeOffset DateWhenDone { get; set; }
            // public TimeSpan TimeDone { get; set; }
            // public int TotalSeconds => (int)TimeDone.TotalSeconds;
            // public List<string> Achievements { get; set; } = new();
        // public TimeSpan TimeDone =>
        //     TimeSpan.FromTicks(AchievementsByDate.Sum(a => a.TimeDone.Ticks));
        // public int TotalMinutes => (int)TimeDone.TotalMinutes;
        // public int TimesCompleted => AchievementsByDate.Count;
                {Id = 1,
                ActivityType = 1,
                Name = "Working",
                AchievementsByDate = new List<AchievementModel>
                {
                    new AchievementModel
                    {
                        Id = 1,
                        ActivityId = 1,
                        DateWhenDone = DateTimeOffset.UtcNow.AddDays(-1),
                        TimeDone = TimeSpan.FromHours(1.5),
                        Description = new List<string>
                        {
                            "Finished new model",
                            "Fixed the new model bugs"
                        }
                    },
                    new AchievementModel
                    {
                        Id = 2,
                        ActivityId = 1,
                        DateWhenDone = DateTimeOffset.UtcNow.AddDays(-2),
                        TimeDone = TimeSpan.FromHours(2),
                        Description = new List<string>
                        {
                            "Improved HomePage",
                        }
                    }
                },
            }
        };

        [HttpGet]
        public ActionResult<ActivityModel[]> Get()
        {
            ActivityModel[] activitiesToReturn = activities.ToArray();

            return Ok(activitiesToReturn);
        }

        [HttpGet("ordered")]
        public ActionResult<IEnumerable<ActivityModel>> GetOrderedActivities()
        {
            ActivityModel[] sortedActivities = activities.OrderByDescending(a => a.TimeDone).ToArray();

            return Ok(sortedActivities);
        }

        [HttpGet("maxactivitytime")]
        public ActionResult<int> GetMaxActivityTime()
        {
            int maxActivityTime = activities.OrderByDescending(a => a.TimeDone).ToArray().First().TotalMinutes;

            return Ok(maxActivityTime);
        }


        [HttpGet("get-achievement-by-date")]
        public ActionResult<AchievementModel[]> GetActivityByDate([FromQuery] DateTimeOffset dateToFind)
        {
            Console.WriteLine($"{dateToFind}");

            var achievementsToReturn = new List<AchievementModel>();

            foreach (ActivityModel activity in activities)
            {
                foreach (AchievementModel achievement in activity.AchievementsByDate)
                {
                    if (achievement.DateWhenDone.Date == dateToFind.Date)
                    {
                        achievementsToReturn.Add(achievement);
                    }
                }
            }

            return Ok(achievementsToReturn);
        }
    }
}