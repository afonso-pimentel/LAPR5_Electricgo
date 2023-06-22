using EletricGo.Domain.Shared;

namespace EletricGo.Domain.Models.UserAggregate;

public class Role : Enumeration
{
    public static Role Admin = new(((int)AttributeRoles.Admin), "Administrator");
    public static Role LogisticsManager = new(((int)AttributeRoles.LogisticsManager), "Logistics Manager");
    public static Role WarehouseManager = new(((int)AttributeRoles.WarehouseManager), "Warehouse Manager");
    public static Role FleetManager = new(((int)AttributeRoles.FleetManager), "Fleet Manager");

    protected Role() { }

    public Role(int id, string name)
        : base(id, name)
    {

    }

    public static IEnumerable<Role> List()
    {
        return new[] { Admin, LogisticsManager, WarehouseManager, FleetManager };
    }

    public static Role FromName(string name)
    {
        var state = List()
            .SingleOrDefault(s => String.Equals(s.Name, name, StringComparison.CurrentCultureIgnoreCase));

        if (state == null)
        {
            throw new ArgumentException($"Possible values for Role: {String.Join(",", List().Select(s => s.Name))}");
        }

        return state;
    }

    public static Role From(int id)
    {
        var state = List().SingleOrDefault(s => s.Id == id);

        if (state == null)
        {
            throw new ArgumentException($"Possible values for Role: {String.Join(",", List().Select(s => s.Name))}");
        }

        return state;
    }
}

public enum AttributeRoles
{
    Admin = 1,
    LogisticsManager = 2,
    WarehouseManager = 3,
    FleetManager = 4,
}