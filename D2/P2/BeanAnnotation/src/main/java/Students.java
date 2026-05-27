public class Students {

    int id;
    String name;
    int age;
    char Section;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public char getSection() {
        return Section;
    }

    public void setSection(char section) {
        Section = section;
    }

    @Override
    public String toString() {
        return "Students{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", Section=" + Section +
                '}';
    }

    public Students(int id, String name, int age, char section) {
        this.id = id;
        this.name = name;
        this.age = age;
        Section = section;
    }
}
