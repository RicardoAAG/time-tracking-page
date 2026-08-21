using TimeFollowingApp.backend.Models;
public interface IActivityRepository
{
    IEnumerable<ActivityModel> GetAll();
}