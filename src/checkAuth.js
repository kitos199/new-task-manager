const url = location.pathname.replace(/\//g, "");
const cookieArray = document.cookie.split(";");
console.log(url,cookieArray);
cookieArray.forEach((e) => {
  const [name, value] = e.split("=");
  if ((name !== "authUser" || isNaN(value)) && url === "new-task-managermanager.html") {
    location.href = "index.html"
    console.log("===>",name,value);
  }
  else if (name === "authUser" && !isNaN(value) && url === "new-task-managerindex.html") {
    location.href = "manager.html"
    console.log("--->",name,value);
  }
}
);
