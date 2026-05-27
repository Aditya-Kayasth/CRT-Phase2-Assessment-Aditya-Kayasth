package rcoem.demo.domain;

public class Employee {

    private int emp_id;
    private String empName;
    private String email;

    public Employee() {
    }

    public Employee(int emp_id, String empName, String email) {
        this.emp_id = emp_id;
        this.empName = empName;
        this.email = email;
    }

    public int getEmp_id() {
        return emp_id;
    }

    public void setEmp_id(int emp_id) {
        this.emp_id = emp_id;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "rcoem.deom.domain.Employee{" +
                "emp_id=" + emp_id +
                ", empName='" + empName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

}
