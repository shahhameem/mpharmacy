import CategoryCard from "./CategoryCard"

  const categoriesData = [
    {
      id: 1,
      title: "Prescription Drugs",
      text: "All your prescribed medications.",
      img: "/images/medicine_ff.webp",
      link: "/medicines?category=Prescription",
    },
    {
      id: 2,
      title: "OTC & Wellness",
      text: "Vitamins, supplements, and more.",
      img: "/images/vitamis.webp",
      link: `/medicines?category=${encodeURIComponent("OTC & Wellness")}`,
    },
    {
      id: 3,
      title: "Sports Nutrition",
      text: "Proteine, whey and more.",
      img: "/images/sports.webp",
      link: "/medicines?category=Sports Nutrition",
    },
    {
      id: 4,
      title: "Personal Care",
      text: "Skincare and hygiene products.",
      img: "/images/personal_care.webp",
      link: "/medicines?category=Personal Care",
    },
  ];

const Categories = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Shop by Category</h2>
        <div className="row g-4">
          {categoriesData.map((category) => (
            <CategoryCard
            key={category.id}
            img={category.img}
            title={category.title}
            text={category.text}
            link={category.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
