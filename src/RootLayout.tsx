import { ThemeProvider } from './components/theme-provider'
import { ModeToggle } from './components/mode-toggle'

function RootLayout() {
  return (
    <ThemeProvider>
      <div className="flex h-screen bg-light text-dark transition transition-colors">
        {/* sidebar component */}
        <div className="border-2 border-red-500">sidebar</div>
        <div className="flex flex-col flex-1">
          {/* header component */}
          <div className="flex border-2 border-red-500 items-center justify-between p-4 border-b">
            {/* Searchbar component */}
            <div className="border-2 border-red-500">Search bar</div>
            {/* ThemeToggle component */}
            <div className="border-2 border-red-500"><ModeToggle /></div>
          </div>
          {/* content component */}
          <div className="border-2 border-red-500 flex-1 overflow-auto p-6">main content</div>
          {/* Audio player compnent */}
          <div className="border-2 border-red-500">audioplayer</div>
      </div>
    </div>
    </ThemeProvider>
  )
}

export default RootLayout
