namespace TimeFollowingApp.backend.Models
{
    public class AchievementModel
    {
        public int Id { get; set; }
        public int ActivityId { get; set; }
        public DateTimeOffset DateWhenDone { get; set; }
        public TimeSpan TimeDone { get; set; }
        public int TotalSeconds => (int)TimeDone.TotalSeconds;
        public List<string> Achievements { get; set; } = new();
    }
}