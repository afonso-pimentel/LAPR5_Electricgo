using System;

public class WarehouseException : Exception
{
	public WarehouseException()
	{
	}

	public WarehouseException(string message)
		: base(message)
	{
	}

	public WarehouseException(string message, Exception inner)
		: base(message, inner)
	{
	}
}
