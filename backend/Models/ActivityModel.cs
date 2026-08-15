namespace TimeFollowingApp.backend.Models
{
    public class ActivityModel
    {
        public int Id { get; set; }
        public int ActivityType { get; set; }
        public string? Name { get; set; }
        public TimeSpan TimeDone { get; set; }
        public Dictionary<DateTimeOffset, List<string>> AchievementsByDate { get; set; } = new();
        public int TotalMinutes => (int)TimeDone.TotalMinutes;
    }
}