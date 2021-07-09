// Listen to the form being submitted
document.getElementById("mainForm").addEventListener('submit', addDestinationToList)

function addDestinationToList(event) {

  event.preventDefault(); // stop the form from refreshing the page

  // Extract the values of the different elements of the form and store them in variables
  //alert(event.target.picture.value);
  let destinationName = event.target.name.value;
  let destinationLocation = event.target.location.value;
  let destinationPicture = event.target.picture.value;
  let destinationDesc = event.target.description.value;

  // Reset the form  for a new entry
  resetForm(event);

  // Use the form elements values to create a bucketlist card
  var bucketListCard = createBucketListCard(
    destinationName,
    destinationLocation,
    destinationPicture,
    destinationDesc
  );
  alert(bucketListCard.innerHTML);
  let wishListContainer = document.querySelectorAll("#destinations_container")[0];

  // Change wishlist title if the wishlist was empty
  if (wishListContainer.children.length === 0) {
    document.querySelector("#title").innerHTML = "My Bucket List";
  }

  wishListContainer.appendChild(bucketListCard);
}

function resetForm(event) {

  //alert("I was called");
  for (let i = 0; i < event.target.length; i++) {
    event.target.elements[i].value = "";
  }

}

function createBucketListCard(name, location, urlDestination, description) {

  // Use the passed arguments to create a bootstrap card with destination details
  var card = document.createElement("div");
  card.setAttribute("class", "card");
  card.style.width = "15rem";
  card.style.height = "fit-content";
  card.style.margin = "15px;";

  // Create the destination photo element and append it to the card
  var img = document.createElement("img");
  img.setAttribute("class", "card-img-top");
  img.setAttribute("alt", name);

  // Check to make sure that the photo url was entered since it's optional
  // if the user didn't enter a photo url, show a constant photo
  var defaultPicture =
    "https://th.bing.com/th/id/R.98e8db145e61402fc9ab24bb9571d0b5?rik=q8XzHHP3JVWpnA&riu=http%3a%2f%2fai.stanford.edu%2f~latombe%2fmountain%2fphoto%2fnepal-traverse-08-11%2fleg7_files%2fimage043.jpg&ehk=AZg3SzKWiinbZQcheBu3tYqf1zkaHXzyrbnOYDU2i%2bU%3d&risl=&pid=ImgRaw";
  switch (urlDestination.length) {
    case 0:
      img.setAttribute("src", defaultPicture);
      break;
    default:
      img.setAttribute("src", urlDestination);
  }


  card.appendChild(img);

  // Create the card body with the destination name, location, and description and append it to the card
  var cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  var cardDestinationName = document.createElement("h5");
  cardDestinationName.setAttribute("class", "card-title");
  cardDestinationName.innerText = name;
  cardBody.appendChild(cardDestinationName);

  var cardLocation = document.createElement("h6");
  cardLocation.setAttribute("class", "card-subtitle mb-2 text-muted");
  cardLocation.innerText = location;
  cardBody.appendChild(cardLocation);

  // Only add description text if the user entered some
  if (description.length !== 0) {
    var cardText = document.createElement("p");
    cardText.setAttribute("class", "card-text");
    cardText.innerText = description;
    cardBody.appendChild(cardText);
  }

  var buttonsContainer = document.createElement("div");
  buttonsContainer.setAttribute("class", "buttons_container");

  var cardEditBtn = document.createElement("button");
  cardEditBtn.setAttribute("class", "btn btn-warning");
  cardEditBtn.innerText = "Edit";
  cardEditBtn.addEventListener("click", editDestination);

  var cardDeleteBtn = document.createElement("button");
  cardDeleteBtn.setAttribute("class", "btn btn-danger");
  cardDeleteBtn.innerText = "Remove";
  cardDeleteBtn.addEventListener("click", removeDestination);

  buttonsContainer.appendChild(cardEditBtn);
  buttonsContainer.appendChild(cardDeleteBtn);

  cardBody.appendChild(buttonsContainer);

  card.appendChild(cardBody);
 // alert(`I have the values:${name} ${location}`);
  // alert(card.innerHTML);
  return card;

}

function editDestination(event) {
  var cardBody = event.target.parentElement.parentElement;
  var title = cardBody.children[0];
  var subTitle = cardBody.children[1];

  var card = cardBody.parentElement;
  var photoUrl = card.children[0];

  var newTitle = window.prompt("Enter new name");
  var newSubtitle = window.prompt("Enter new location");
  var newPhotoUrl = window.prompt("Enter new photo url");

  if (newTitle.length > 0) {
    title.innerText = newTitle;
  }

  if (newSubtitle.length > 0) {
    subTitle.innerText = newSubtitle;
  }

  if (newPhotoUrl.length > 0) {
    photoUrl.setAttribute("src", newPhotoUrl);
  }
}

function removeDestination(event) {
  var cardBody = event.target.parentElement.parentElement;
  var card = cardBody.parentElement;
  card.remove();
}