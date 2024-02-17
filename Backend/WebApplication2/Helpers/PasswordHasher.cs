using System;
using System.Security.Cryptography;
using System.Text;

namespace WebApplication2.Helpers
{
    public class PasswordHasher
    {
        public static string HashPassword(string password)
        {
            byte[] hashedBytes = SHA256.HashData(Encoding.UTF8.GetBytes(password));
            StringBuilder builder = new();
            for (int i = 0; i < hashedBytes.Length; i++)
            {
                builder.Append(hashedBytes[i].ToString("x2"));
            }

            return builder.ToString();
        }
    }
}
