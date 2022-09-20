from canvasFunctions import assingment_id_extractor, get_due_dates, course_name

added = True
course_lstt = []

while True:
    txt_file = open("classes.txt", "r+")
    print("\n==Options==")
    print("Type either the number or the letter of choice")
    print("1: Add Courses")
    print("2: View Courses and Assignments")
    print("q: Quit")

    choice = str(input())

    if choice == "1":
        course_id = input("Input your course ID from Canvas\n")
        if added:
            course_lsts = txt_file.readlines()
            for g in course_lsts:
                t = g.replace("\n","")
                course_lstt.append(t)
                course_lst = course_lstt
        try:
            name = course_name(course_id)
            course_lst.append(course_id)
            print("You added:", name)
        except:
            print("Invalid Course ID. Please Try Again")
        added = False
    if choice == "2":
        if added:
            course_lsts = txt_file.readlines()
            for g in course_lsts:
                t = g.replace("\n","")
                course_lstt.append(t)
                course_lst = course_lstt
        print("Current Courses")
        count = 1
        for i in course_lst:
            names = course_name(i)
            print(count, ": Name:", names)
            count += 1
        print("\nType the number of course to see the assignments and due dates. Ex. 1")
        try:
            x = int(input())
            assign_ids = assingment_id_extractor(course_lst[x-1])
            assing_dues = get_due_dates(assign_ids)
            lst1 = list(assing_dues)
            lst2 = list(assing_dues.values())
            for k in range(len(lst1)):
                print(lst2[k], lst1[k])
        except:
            print("Invalid Course Number. Please Try Again")
    if choice == "q":
        txt_file = open("classes.txt", "w")
        for s in course_lst:
            course_num = str(s)
            txt_file.write(f"{course_num}\n")
        break
