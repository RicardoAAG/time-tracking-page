namespace TimeFollowingApp.backend.Models
{
    public class ActivityModel
    {
        public int Id { get; set; }
        public int ActivityType { get; set; }
        public string? Name { get; set; }
        public List<AchievementModel> AchievementsByDate { get; set; } = new();
        public TimeSpan TimeDone =>
            TimeSpan.FromTicks(AchievementsByDate.Sum(a => a.TimeDone.Ticks));
        public int TotalMinutes => (int)TimeDone.TotalMinutes;
        public int TimesCompleted => AchievementsByDate.Count;
    }
}