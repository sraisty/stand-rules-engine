export default function HomePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Dear Stand Insurance Team, </h1>
      <h1 className="text-3xl font-bold">From Sue Raisty</h1>
      <h2 className="text-xl font-bold">Thanks for reviewing my take-home!</h2>

      <p className="text-md">
        I hope it gives you confidence in my ability to design and implement a solution that meets
        your needs. I am excited about the opportunity to work with you and the team at Stand
        Insurance.
      </p>
      <div className="space-y-2">
        <ul className="pl-5 space-y-2 list-disc">
          <li>
            View the full project source on GitHub:{' '}
            <a
              href="https://github.com/sraisty/stand-mitigation-engine"
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
  )
}
