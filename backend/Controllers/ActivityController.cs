using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Diagnostics;
using TimeFollowingApp.backend.Models;

namespace TimeFollowingApp.backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ActivityController : ControllerBase
    {
        private static IEnumerable<ActivityModel> activities = new[]{
            new ActivityModel
                {Id = 1,
                ActivityType = 1,
                Name = "Working",
                AchievementsByDate = new Dictionary<DateTimeOffset, List<string>>
                {
                    [DateTimeOffset.Now] = new()
                    {
                        "Finished model",
                        "Showed model in webpage",
                    },
                    [DateTimeOffset.Now.AddDays(-1)] = new()
                    {
                        "Achieved retrieving max activity time"
                    }
                },
                TimeDone = TimeSpan.FromHours(1.5)
            },
            new ActivityModel
                {Id = 2,
                ActivityType = 1,
                Name = "Gaming",
                AchievementsByDate = new Dictionary<DateTimeOffset, List<string>>
                {
                    [DateTimeOffset.Now] = new()
                    {
                        "Reached Diamond",
                        "3 win Streak",
                    }
                },
                TimeDone = TimeSpan.FromHours(2)
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


        [HttpGet("get-activity-by-date")]
        public ActionResult<ActivityModel[]> GetActivityByDate([FromQuery] DateTime dateToFind)
        {
            ActivityModel[] activityToReturn = activities
                    .Where(a => a.AchievementsByDate != null &&
                                a.AchievementsByDate.Keys.Any(k => k.Date == dateToFind.Date))
                    .ToArray();

            return Ok(activityToReturn);
        }
    }
}