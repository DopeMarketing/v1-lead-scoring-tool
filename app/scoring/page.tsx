import { createServerSupabaseClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function ScoringPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // TODO: Fetch current scoring rules from scoring_rules, territories, and categories tables
  const emailRules = { enabled: true, weight: 25 }
  const locationRules = { enabled: true, weight: 35 }
  const categoryRules = { enabled: true, weight: 40 }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Scoring Rules</h1>
        <p className="text-gray-600">Configure lead scoring parameters and weights</p>
      </div>

      {/* Scoring Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <a href="/scoring" className="border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Overview
            </a>
            <a href="/scoring/email" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Email Rules
            </a>
            <a href="/scoring/location" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Location Rules
            </a>
            <a href="/scoring/categories" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Category Rules
            </a>
          </nav>
        </div>

        <div className="p-6">
          {/* Scoring Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Email Validation</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  emailRules.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {emailRules.enabled ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">Validate email addresses and score based on deliverability</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Weight</span>
                <span className="text-lg font-semibold text-gray-900">{emailRules.weight}%</span>
              </div>
              <a href="/scoring/email" className="mt-4 block w-full text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-md text-sm hover:bg-gray-200">
                Configure
              </a>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Location Scoring</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  locationRules.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {locationRules.enabled ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">Score leads based on geographic territory relevance</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Weight</span>
                <span className="text-lg font-semibold text-gray-900">{locationRules.weight}%</span>
              </div>
              <a href="/scoring/location" className="mt-4 block w-full text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-md text-sm hover:bg-gray-200">
                Configure
              </a>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Request Categories</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  categoryRules.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {categoryRules.enabled ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">Categorize and score leads by request type</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Weight</span>
                <span className="text-lg font-semibold text-gray-900">{categoryRules.weight}%</span>
              </div>
              <a href="/scoring/categories" className="mt-4 block w-full text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-md text-sm hover:bg-gray-200">
                Configure
              </a>
            </div>
          </div>

          {/* Global Settings */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Global Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Qualifying Score
                </label>
                <input 
                  type="number" 
                  min="0" 
                  max="100" 
                  defaultValue="70" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auto-assign Qualified Leads
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option>Disabled</option>
                  <option>Round Robin</option>
                  <option>Territory Based</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}