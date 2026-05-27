package P1;

public class LaunchCal {
    public static void main(String[]args){
        Cal c = new Cal();

        int res = c.divide(10, 5);

        if (res == 2){
            System.out.println("Test cass passed");
        }else{
            System.out.println("Test case failed");
        }
    }
}
