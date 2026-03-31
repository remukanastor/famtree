const profileCard = document.getElementById("profileCard");

fetch("data/family.json")
.then(res => res.json())
.then(json => {

  const data = json.members;

  const tree = new FamilyTree(document.getElementById("tree"), {

    mouseScrool: FamilyTree.action.zoom,

    nodeBinding: {
      field_0: "name",
      img_0: "photo"
    },

    nodeMouseClick: FamilyTree.action.none
  });

  tree.load(data);

  tree.on('click', function(sender, args){

    const person = args.node;

    document.getElementById("profileName").innerText = person.name;
    document.getElementById("profilePhoto").src = person.photo || "";
    document.getElementById("profileInfo").innerText =
      `Tahun Lahir: ${person.birth || '-'}\n${person.bio || ''}`;

    profileCard.classList.remove("hidden");
  });

});

document.getElementById("closeBtn").onclick = () =>
  profileCard.classList.add("hidden");
