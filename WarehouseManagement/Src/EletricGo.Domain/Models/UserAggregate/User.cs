using EletricGo.Domain.Shared;

namespace EletricGo.Domain.Models.UserAggregate;

public sealed class User : Entity<UserId>, IAggregateRoot
{
    /// <summary>
    /// The user name
    /// </summary>
    public string Name { get; private set; }
    /// <summary>
    /// The email
    /// </summary>
    public Email Email { get; private set; }
    /// <summary>
    /// The user phone mumber
    /// </summary>
    public PhoneNumber PhoneNumber { get; private set; }
    /// <summary>
    /// The user role
    /// </summary>
    public Role Role { get; private set; }
    /// <summary>
    /// The user corresponding google api id
    /// </summary>
    public GoogleId? GoogleId { get; private set; }

    /// <summary>
    /// For ORM ONLY
    /// </summary>
    protected User() { }

    /// <summary>
    /// Initializes a new instance of <see cref="User"/>
    /// </summary>
    /// <param name="name">The user name.</param>
    /// <param name="phoneNumber">The user phone number.</param>
    public User(string name, PhoneNumber phoneNumber, Role role, Email email, GoogleId? googleId)
    {
        Id = new UserId(Guid.NewGuid());
        Name = ValidateName(name);
        PhoneNumber = phoneNumber;
        Email = email;
        Role = role;
        GoogleId = googleId;
    }

    /// <summary>
    /// Initializes a new instance of <see cref="User"/>
    /// </summary>
    /// <param name="userId">The user id.</param>
    /// <param name="name">The user name.</param>
    /// <param name="phoneNumber">The user phone number.</param>
    public User(UserId userId, string name, PhoneNumber phoneNumber, Role role, Email email, GoogleId? googleId)
    {
        Id = userId;
        Name = ValidateName(name);
        PhoneNumber = phoneNumber;
        Email = email;
        Role = role;
        GoogleId = googleId;
    }

    private string ValidateName(string name)
    {
        if (string.IsNullOrEmpty(name))
            throw new UserException("Name is required");
        return name;
    }

    /// <summary>
    /// Anonymize the user.
    /// </summary>
    public void Anonymize()
    {
        Name = "User_" + DateTime.Now.ToString("yyyyMMddHHmmss");
        PhoneNumber = new PhoneNumber("999999999");
        Email = new Email("deleted@user.com");
        GoogleId = null;
    }

    public void BindGoogleId(GoogleId googleId)
    {
        this.GoogleId = googleId;
    }
}
