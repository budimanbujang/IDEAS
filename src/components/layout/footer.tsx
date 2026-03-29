import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
                <span className="text-sm font-bold text-white">I</span>
              </div>
              <span className="text-lg font-bold text-gray-900">IDEAS</span>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Integrated Discovery, Engagement & Acceleration System. JCorp&apos;s multi-sector
              innovation aggregator platform.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Platform</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/dashboard/marketplace" className="text-sm text-gray-500 hover:text-gray-700">AI Marketplace</Link></li>
              <li><Link href="/dashboard/sandbox" className="text-sm text-gray-500 hover:text-gray-700">Innovation Sandbox</Link></li>
              <li><Link href="/dashboard/collaboration" className="text-sm text-gray-500 hover:text-gray-700">Collaboration Hub</Link></li>
              <li><Link href="/dashboard/trust-mark" className="text-sm text-gray-500 hover:text-gray-700">Trust Mark</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Guilds</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/dashboard/guilds/healthcare" className="text-sm text-gray-500 hover:text-gray-700">Healthcare</Link></li>
              <li><Link href="/dashboard/guilds/proptech" className="text-sm text-gray-500 hover:text-gray-700">Proptech</Link></li>
              <li><Link href="/dashboard/guilds/agrifood" className="text-sm text-gray-500 hover:text-gray-700">Agrifood</Link></li>
              <li><Link href="/dashboard/guilds/food-services" className="text-sm text-gray-500 hover:text-gray-700">Food Services</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/about" className="text-sm text-gray-500 hover:text-gray-700">About IDEAS</Link></li>
              <li><Link href="/roadmap" className="text-sm text-gray-500 hover:text-gray-700">Roadmap</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-700">Documentation</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-700">API Reference</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; 2026 JCorp IDEAS. All rights reserved. Powered by Johor Corporation.
          </p>
        </div>
      </div>
    </footer>
  );
}
