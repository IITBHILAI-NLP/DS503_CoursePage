function changer(obj) {
  obj.parentElement.querySelector(".nested").classList.toggle("active");
  obj.classList.toggle("caret-down");
}

function runner(path) {
  if (path.includes(".")) {
    // File
    var elem = document.createElement("li");
    var link = document.createElement("a");
    elem.classList = ["file"];
    link.setAttribute("href", path);
    link.setAttribute("target", "_blank");
    link.innerText = path.split("/").pop();
    elem.appendChild(link);
    return elem;
  } else {
    // Folder
    var fold = document.createElement("li");
    var value = document.createElement("span");
    value.classList = ["caret"];
    value.innerText = path.split("/").pop();
    value.setAttribute("onclick", "changer(this)");
    fold.appendChild(value);
    var child = document.createElement("ul");
    child.classList = ["nested"];
    $.getJSON(path, (data) => {
      data.forEach((x) => {
        child.appendChild(runner(path + "/" + x));
      });
    });
    fold.appendChild(child);
    return fold;
  }
}

document.getElementById("my_treeview").appendChild(runner("Course Materials"));

var b = document.getElementById("annun");

for (let i = announcements.length - 1; i >= 0; i--) {
  let x = announcements[i];
  let container = document.createElement("div");
  container.classList = ["ann_elem"];
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  let hr = document.createElement("hr");
  p1.innerText = x[0];
  p2.innerText = x[1];
  p1.classList = ["ann_elem_title"];
  p2.classList = ["ann_elem_body"];
  container.appendChild(p1);
  container.appendChild(hr);
  container.appendChild(p2);
  b.appendChild(container);
}
