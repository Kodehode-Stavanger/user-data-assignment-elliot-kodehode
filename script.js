/** @format */

const profileForm = document.getElementById("main-form");
const petsContainer = document.getElementById("pets-container");
const filterDogs = document.getElementById("show-dogs");
const filterCats = document.getElementById("show-cats");

let profiles = [];

const storedProfiles = localStorage.getItem("profiles");
if (storedProfiles) {
  profiles = JSON.parse(storedProfiles);
  renderProfiles(profiles);
  //   localStorage.clear();
}

profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const profileData = new FormData(profileForm);
  profiles.push({
    petName: "Navn: " + profileData.get("pet-name").trim(),
    petType: profileData.get("pet-type"),
    gender: "Kjønn: " + profileData.get("gender"),
    birthday: "Født: " + profileData.get("pet-age"),
    breed: "Rase: " + profileData.get("pet-breed"),
    energyLevel: "Aktivitetsnivå: " + profileData.get("activity-level"),
    description: profileData.get("desc").trim(),
    profilePic:
      profileData.get("pet-type") === "dog" ? "dogicon.png" : "caticon.png",
  });
  profileForm.reset();
  renderProfiles(profiles);
  console.log(profiles);
});

function filterAndSort(arr) {
  return arr
    .filter((e) => (!filterDogs.checked ? !(e.petType === "dog") : e))
    .filter((e) => (!filterCats.checked ? !(e.petType === "cat") : e));
}

filterDogs.addEventListener("change", () => {
  renderProfiles(profiles);
});
filterCats.addEventListener("change", () => {
  renderProfiles(profiles);
});

function renderProfiles(arr) {
  while (petsContainer.firstChild) {
    petsContainer.firstChild.remove();
  }
  // makes container
  const filteredProfiles = filterAndSort(arr);

  filteredProfiles.forEach((e) => {
    const petContainer = document.createElement("div");
    petContainer.classList.add("pet-container");

    // name element
    const nameElement = document.createElement("input");
    nameElement.readOnly = true;
    nameElement.value = e.petName;
    nameElement.className = "name";

    // type element

    const typeElement = document.createElement("input");
    typeElement.readOnly = true;
    typeElement.value = e.petType;
    typeElement.className = "pet-type";

    // gender element

    const genderElement = document.createElement("input");
    genderElement.readOnly = true;
    genderElement.value = e.gender;
    genderElement.className = "pet-gender";

    // birthday element

    const birthdayElement = document.createElement("input");
    birthdayElement.readOnly = true;
    birthdayElement.value = e.birthday;
    birthdayElement.className = "pet-birthday";

    // breed element

    const breedElement = document.createElement("input");
    breedElement.readOnly = true;
    breedElement.value = e.breed;
    breedElement.className = "pet-breed";

    // energy element

    const energyElement = document.createElement("input");
    energyElement.readOnly = true;
    energyElement.value = e.energyLevel;
    energyElement.id = "pet-energy";

    // description element

    const descElement = document.createElement("textarea");
    descElement.readOnly = true;
    descElement.value = e.description;
    descElement.className = "pet-description";
    descElement.rows = 8;
    descElement.cols = 22;

    // picture element

    const pictureElement = document.createElement("img");
    pictureElement.src = e.profilePic;
    pictureElement.style.width = "100px";
    pictureElement.className = "pet-img";

    // add to container

    petContainer.append(
      pictureElement,
      nameElement,
      //   typeElement,
      genderElement,
      birthdayElement,
      breedElement,
      energyElement,
      descElement
    );

    petsContainer.prepend(petContainer);
  });
  saveStateLocal();
}

function saveStateLocal() {
  localStorage.setItem("profiles", JSON.stringify(profiles));
  // localStorage.setItem("showCompleted", showCompleted.checked);
  // localStorage.setItem("sortBy", sortBy.value);
}
