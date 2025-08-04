 const hamburger = document.getElementById("hamburger");
    const sidebar = document.getElementById("sidebar");

    hamburger.addEventListener("click", () => {
        sidebar.classList.toggle("active");
    });

    // Optional: close sidebar when link clicked
    sidebar.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            sidebar.classList.remove("active");
        });
    });


window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // DAUN - geser ke kanan makin jauh
  const daun = document.querySelector('.daun');
  daun.style.transform = `translateX(${scrollY * 1.5}px)`;

  // BURUNG - gerak muter semi sirkular
  const burung = document.querySelector('.burung');
  const radius = 100; // kecilin biar ga ngacir
  const angle = scrollY / 100; // kecilin biar geraknya halus

  // posisi pusat orbit
  const centerX = window.innerWidth / 2 - 50; // offset dikit biar di tengah
  const centerY = 100;

  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);

  burung.style.transform = `translateX(${scrollY * 1.5}px)`;

  // JUDUL & BUTTON - turun pelan
  document.querySelector('.title').style.transform = `translateY(${scrollY * 0.8}px)`;
  document.querySelector('.btn-primary').style.transform = `translateY(${scrollY * 0.8}px)`;
});
