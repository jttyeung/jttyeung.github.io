function filterProjects() {
  var projectType = document.getElementById('projects-list');
  var bootstrap = document.getElementById('projects-bootstrap');
  var javascript = document.getElementById('projects-javascript');
  var rubyonrails = document.getElementById('projects-rubyonrails');
  var python = document.getElementById('projects-python');
  if(projectType = all){
    bootstrap.style.display = "block";
    javascript.style.display = "block";
    rubyonrails.style.display = "block";
    python.style.display = "block";
  } else if(projectType = bootstrap){
    bootstrap.style.display = "block";
    javascript.style.display = "none";
    rubyonrails.style.display = "none";
    python.style.display = "none";
  } else if(projectType = javascript){
    bootstrap.style.display = "none";
    javascript.style.display = "block";
    rubyonrails.style.display = "none";
    python.style.display = "none";
  } else if(projectType = rubyonrails){
    bootstrap.style.display = "none";
    javascript.style.display = "none";
    rubyonrails.style.display = "block";
    python.style.display = "none";
  } else if(projectType = python){
    bootstrap.style.display = "none";
    javascript.style.display = "none";
    rubyonrails.style.display = "none";
    python.style.display = "block";
  }
}
