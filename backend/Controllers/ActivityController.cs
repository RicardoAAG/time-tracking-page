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
        private readonly IActivityRepository _activityRepository;
        public ActivityController(IActivityRepository activityRepository)
        {
            _activityRepository = activityRepository;
        }

        [HttpGet]
        public IActionResult GetActivities()
        {
            var activities = _activityRepository.GetAll();
            return Ok(activities);
        }

        [HttpGet("ordered")]
        public ActionResult<IEnumerable<ActivityModel>> GetOrderedActivities()
        {
            ActivityModel[] sortedActivities = _activityRepository.GetAll().OrderByDescending(a => a.TimeDone).ToArray();

            return Ok(sortedActivities);
        }

        [HttpGet("maxactivitytime")]
        public ActionResult<int> GetMaxActivityTime()
        {
            int maxActivityTime = _activityRepository.GetAll().OrderByDescending(a => a.TimeDone).ToArray().First().TotalMinutes;

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

            foreach (ActivityModel activity in _activityRepository.GetAll())
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