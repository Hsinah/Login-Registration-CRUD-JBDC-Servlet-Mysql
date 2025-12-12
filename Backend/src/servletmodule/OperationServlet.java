

package servletmodule;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import module.Validation;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

@WebServlet("/api/login")
public class OperationServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        String action = request.getServletPath();

        switch (action) {
            case "/api/login": {
                Validation vl = new Validation();
                try {
                    vl.loginValidation(request, response);
                } catch (SQLException e) {
                    System.err.println("Database error during login: " + e.getMessage());
                    e.printStackTrace();
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    PrintWriter out = response.getWriter();
                    out.print("{\"success\": false, \"message\": \"Internal Server Error: Database access failed.\" }");
                    out.flush();
                } catch (ClassNotFoundException e) {
                    throw new RuntimeException(e);
                }
                break;
            }
        }
    }
}