var currentTime = new Date();
async function testData(){
    var assignment_names = [];
    classIds = [48117, 49725, 48939, 47295];
    for (let i = 0; i < classIds.length; i++){
        var temp_assignments = [];
        var course = String(classIds[i]);
        var res1 = await fetch(`https://canvas.eee.uci.edu/api/v1/courses/${course}/assignments?access_token=${token}`);
        var record1 = await res1.json();
        //console.log(course)
        for (let j = 0; j < 10; j++){
            var assignment_name = record1[j]?.name;
            var assignment_date = record1[j]?.due_at;
            if (assignment_date > currentTime){
                if (assignment_name != undefined){
                    temp_assignments.push(assignment_name);
                }
            }
        }
        assignment_names.push(temp_assignments);
    }
    console.log(assignment_names);
}
testData();