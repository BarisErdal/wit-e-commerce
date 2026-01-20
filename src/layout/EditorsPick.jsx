import Button from "../components/Button";

export default function EditorsPick() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-xl font-bold tracking-wide">
          EDITOR’S PICK
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Problems trying to resolve the conflict between
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* MEN */}
        <div className="relative md:col-span-2 h-125">
          <img
            src="/men.jpg"
            alt="Men"
            className="w-full h-full object-cover"
          />
          <Button >
            MEN
          </Button>
        </div>

        {/* WOMEN */}
        <div className="relative h-125">
          <img
            src="/women.jpg"
            alt="Women"
            className="w-full h-full object-cover"
          />
          <Button className="absolute bottom-6 left-6 bg-white px-6 py-2 text-sm font-bold">
            WOMEN
          </Button>
        </div>

        {/* Right Column */}
        <div className="grid grid-rows-2 gap-6 h-125">
          {/* ACCESSORIES */}
          <div className="relative">
            <img
              src="/accessories.jpg"
              alt="Accessories"
              className="w-full h-full object-cover"
            />
            <Button className="absolute bottom-4 left-4 bg-white px-4 py-2 text-xs font-bold">
              ACCESSORIES
            </Button>
          </div>

          {/* KIDS */}
          <div className="relative">
            <img
              src="/kids.jpg"
              alt="Kids"
              className="w-full h-full object-cover"
            />
            <Button className="absolute bottom-4 left-4 bg-white px-4 py-2 text-xs font-bold">
              KIDS
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
