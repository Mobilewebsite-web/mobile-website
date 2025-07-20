import { useUser } from "../context/UserContext";

const Terms = () => {
  const { isDarkMode } = useUser();

  return (
    <div
      className={`max-w-4xl mt-8 min-h-screen mx-auto px-4 sm:px-8 py-8 rounded-lg ${
        isDarkMode ? "bg-zinc-900 text-zinc-100" : "bg-white text-zinc-800"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Acceptance</h2>
        <p>
          By using this website, you agree to comply with and be bound by the
          following terms and conditions of use.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Changes to Terms</h2>
        <p>
          We reserve the right to change these terms at any time without notice. Your
          continued use of the site means you accept those changes.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Use of the Site</h2>
        <p>
          You agree to use the site only for lawful purposes and not to engage in any
          conduct that may damage the site or its content.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Limitation of Liability</h2>
        <p>
          We are not liable for any damages arising from your use of the site, including
          but not limited to direct, indirect, incidental, or consequential damages.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Contact</h2>
        <p>
          If you have any questions about these Terms, you can contact us at
          support@example.com.
        </p>
      </section>
    </div>
  );
};

export default Terms;
