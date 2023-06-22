using EletricGo.Domain.Models.UserAggregate;

namespace EletricGo.Domain.UnitTests.Models.UserAggregate;

public sealed class UserTests
{
    [Fact]
    public void Test_Constructor_With_Name_And_PhoneNumber()
    {
        // Arrange
        var name = "John Doe";
        var phoneNumber = new PhoneNumber("123456789");

        // Act
        var user = new User(name, phoneNumber, Role.Admin, new Email("test@test.tes"), null);

        // Assert
        Assert.NotEmpty(user.Id.Value);
        Assert.Equal(name, user.Name);
        Assert.Equal(phoneNumber, user.PhoneNumber);
    }

    [Fact]
    public void Test_Constructor_With_UserId_Name_And_PhoneNumber()
    {
        // Arrange
        var userId = new UserId(Guid.NewGuid());
        var name = "John Doe";
        var phoneNumber = new PhoneNumber("123456789");

        // Act
        var user = new User(userId, name, phoneNumber, Role.Admin, new Email("test@test.tes"), null);

        // Assert
        Assert.Equal(userId, user.Id);
        Assert.Equal(name, user.Name);
        Assert.Equal(phoneNumber, user.PhoneNumber);
    }

    [Fact]
    public void Test_ValidateName_Throws_Exception_For_Empty_Name()
    {
        // Act and Assert
        Assert.Throws<UserException>(() => new User("", new PhoneNumber(""), Role.Admin, new Email("test@test.tes"), null));
    }

    [Fact]
    public void Test_Anonymize_ShouldBeExpectedResults()
    {
        // Arrange
        var user = new User("John Smith", new PhoneNumber("123456789"), Role.Admin, new Email("test@test.pt"), new GoogleId("12345"));

        // Act
        user.Anonymize();

        // Assert
        Assert.StartsWith("User_", user.Name);
        Assert.Equal("999999999", user.PhoneNumber.Number);
        Assert.Equal("deleted@user.com", user.Email.EmailValue);
        Assert.Null(user.GoogleId);
    }

    [Fact]
    public void Test_BindGoogleId_ShouldBeExpectedResults()
    {
        // Arrange
        var user = new User("John Smith", new PhoneNumber("123456789"), Role.Admin, new Email("test@test.pt"), null);

        var googleId = new GoogleId("12345");
        // Act
        user.BindGoogleId(googleId);

        // Assert
        Assert.Equal(googleId, user.GoogleId);
    }

}
