async function fetchData(access_token) {
  var token = String(access_token);
  var courses = `https://cors-anywhere.herokuapp.com/https://canvas.eee.uci.edu/api/v1/courses?include[]=term&per_page=50&access_token=${token}`;
  var currentTime = new Date();
  var currentMonth = currentTime.getMonth()+1;
  var currentYear = String(currentTime.getFullYear());
  const classes = [];
  const classIds = [];

  if (currentMonth < 4){
    var termMonth = "Winter"
  } else if (currentMonth < 7){
    var termMonth = "Spring"
  } else if (currentMonth < 13){
    var termMonth = "Fall"
  }
  var term = `${termMonth} ${currentYear}`
  const res=await fetch (courses,{mode: 'cors'});
  const record=await res.json();
  for (let i = 0; i < record.length; i++) {
    var term_name = record[i].term?.name;
    var class_name=record[i].name;
    var class_id=record[i].id;
    if (term_name == term){
      classes.push(class_name);
      classIds.push(class_id)
    }
  }
  const assignment_names = []
  for (let i = 0; i < classIds.length; i++){
    const temp_assignments = [];
    for (let j = 0; j < classIds.length; j++){
      var course = classIds[i];
      var assignments = `https://cors-anywhere.herokuapp.com/https://canvas.eee.uci.edu/api/v1/courses/${course}/assignments?access_token=${token}`;
      var res1 = await fetch(assignments);
      var record1 = await res1.json();
      var assignment_name = record1[j].name;
      temp_assignments.push(assignment_name);
    }
    assignment_names.push(assignment_name);
  }
  document.getElementById("class1").innerHTML=assignment_names[0];
}

fetchData('');
