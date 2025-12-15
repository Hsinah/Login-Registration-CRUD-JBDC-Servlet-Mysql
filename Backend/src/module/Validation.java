// module/Validation.java

package module;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

public class Validation {

    final String db_url = "jdbc:mysql://localhost:3306/crud_jdbc";
    final String db_username = "root";
    final String db_pass = "";

    public void loginValidation(HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException, ClassNotFoundException {
        Class.forName("com.mysql.cj.jdbc.Driver");

        Connection con = DriverManager.getConnection(db_url, db_username, db_pass);

        final String username = request.getParameter("username");
        final String password = request.getParameter("password");
        final String db_query = "select name,password,email,dob,country FROM users where username = ?";

        PreparedStatement pst = con.prepareStatement(db_query);
        pst.setString(1, username);

        ResultSet rs = pst.executeQuery();

        PrintWriter out = response.getWriter();

        if (rs.next()) {

            String name = rs.getString("name");
            String pass = rs.getString("password");
            String email = rs.getString("email");
            String dob = rs.getString("dob");
            String country = rs.getString("country");

            if (pass.equals(password)) {
                // Successful Login
                out.print("{");
                out.print("\"success\": true,");
                out.print("\"name\": \"" + name + "\",");
                out.print("\"email\": \"" + email + "\",");
                out.print("\"dob\": \"" + dob + "\",");
                out.print("\"country\": \"" + country + "\"");
                out.print("}");
            } else {
                out.print("{\"success\": false, \"message\": \"Wrong UserName or password.\" }");
            }

        } else {
            out.print("{\"success\": false, \"message\": \"Wrong UserName or password.\" }");
        }

        rs.close();
        pst.close();
        con.close();

        out.flush();
    }


    public void RegisterValidation(HttpServletRequest request,HttpServletResponse response) throws Exception{
        Class.forName("com.mysql.cj.jdbc.Driver");

        
    }
}