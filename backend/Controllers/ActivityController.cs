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
            new ActivityModel
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
            },
            new ActivityModel
                {Id = 2,
                ActivityType = 2,
                Name = "Gaming",
                AchievementsByDate = new List<AchievementModel>
                {
                    new AchievementModel
                    {
                        Id = 3,
                        ActivityId = 2,
                        DateWhenDone = DateTimeOffset.UtcNow.AddDays(-3),
                        TimeDone = TimeSpan.FromSeconds(23443),
                        Description = new List<string>
                        {
                            "Reached Diamond",
                        }
                    },
                    new AchievementModel
                    {
                        Id = 4,
                        ActivityId = 2,
                        DateWhenDone = DateTimeOffset.UtcNow.AddDays(-1).AddHours(-4),
                        TimeDone = TimeSpan.FromHours(2),
                        Description = new List<string>
                        {
                            "3 Game Winstreak",
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


        [HttpGet("calculate-timeline-position")]
        public ActionResult<int> CalculateTimelinePosition([FromQuery] DateTimeOffset achievementTime)
        {
            double totalMinutesInDay = achievementTime.TimeOfDay.TotalMinutes;
            double percentage = (totalMinutesInDay / 1440.0) * 100;
            // Console.WriteLine($"---------------------------------");
            return Ok(percentage);
        }


        [HttpGet("get-achievement-by-date")]
        public ActionResult<AchievementModel[]> GetActivityByDate([FromQuery] DateTimeOffset dateToFind)
        {
            // Console.WriteLine($"Recibo {dateToFind.Date}");

            var achievementsToReturn = new List<AchievementModel>();

            foreach (ActivityModel activity in activities)
            {
                foreach (AchievementModel achievement in activity.AchievementsByDate)
                {
                    // Console.WriteLine($"comparando con: {achievement.DateWhenDone.Date}");
                    if (achievement.DateWhenDone.Date == dateToFind.Date)
                    {
                        // Console.WriteLine("Match!!!");
                        achievementsToReturn.Add(achievement);
                    }
                }
            }
            // Console.WriteLine(achievementsToReturn.Count);
            // Console.WriteLine($"---------------------------------");
            return Ok(achievementsToReturn);
        }
    }
}