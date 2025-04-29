export default function HomePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Dear Stand Insurance Team, </h1>
      <h1 className="text-3xl font-bold">From Sue Raisty</h1>
      <h2 className="text-xl font-bold">Thanks for reviewing my take-home!</h2>

      <p className="text-md">
        I hope it gives you confidence in how I approach systems thinking, risk modeling, and product-aligned engineering.
      </p>
      <div className="space-y-2">
        <ul className="list-disc pl-5 space-y-2">
        <li >
          View the full project source on GitHub:{' '}
          <a
            href="https://github.com/YOUR_USERNAME/stand-mitigation-engine"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            github.com/sraisty/stand-mitigation-engine
          </a>
        </li>
        <li>
          Connect with me on LinkedIn:{' '}
          <a
            href="https://www.linkedin.com/in/sueraisty/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            linkedin.com/in/sueraisty
          </a>
        </li>
        </ul>
      </div>
    </div>
  );
}
