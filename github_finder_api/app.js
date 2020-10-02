const github = new GitHub();
const ui = new UI();

const searchUser = document.getElementById("searchUser");

searchUser.addEventListener("keyup", (e) => {
  const userText = e.target.value;

  if (userText) {
    github.getUser(userText).then((data) => {
      if (data.profileData.message == "Not Found") {
        ui.showAlert("User not found", "alert alert-danger");
      } else {
        ui.clearAlert();
        ui.showProfile(data.profileData);
        ui.showRepo(data.repo);
      }
    });
  } else {
    ui.clearProfile();
  }
});
