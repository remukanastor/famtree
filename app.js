const profileCard = document.getElementById("profileCard");

fetch("data/family.json")
  .then(res => res.json())
  .then(json => {

    const tree = new FamilyTree(
      document.getElementById("tree"),
      {
        mouseScrool: FamilyTree.action.zoom,

        nodeBinding: {
          field_0: "name",
          img_0: "photo"
        },

        nodeMouseClick: FamilyTree.action.none
      }
    );

    tree.load(json.members);

    // ✅ CLICK EVENT FIX
    tree.on("click", function(sender, args) {

      const person = args.node.data;

      if (!person) return;

      document.getElementById("profileName").innerText =
        person.name || "-";

      document.getElementById("profilePhoto").src =
        person.photo || "";

      document.getElementById("profileInfo").innerText =
        `Tahun Lahir: ${person.birth || "-"}\n${person.bio || ""}`;

      profileCard.classList.remove("hidden");
    });

  })
  .catch(err => console.error("LOAD ERROR:", err));


// CLOSE BUTTON SAFE
window.onload = () => {
  const closeBtn = document.getElementById("closeBtn");

  if (closeBtn) {
    closeBtn.onclick = () =>
      profileCard.classList.add("hidden");
  }
};
