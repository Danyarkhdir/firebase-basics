export default function Home() {
  return (
    <div className="bg-gray-200  flex justify-center items-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-3xl font-bold mb-4">Welcome to My Website</h2>
        <p className="text-gray-700 text-base mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          porttitor accumsan tincidunt. Fusce dapibus risus at ligula tristique
          tristique. Proin dictum, eros eu sollicitudin molestie, ex sapien
          malesuada justo, at posuere tortor augue quis nunc.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Get Started
        </button>
      </div>
    </div>
  );
}
