export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center py-8">
      <p className="text-gray-500">
        © {new Date().getFullYear()} Estudiar-Mucho. All rights reserved.
      </p>
    </footer>
  );
}
