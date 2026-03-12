import { useState } from "react"

export const useTheme = () => {
    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => setIsDark(prev => !prev);

    return { isDark, toggleTheme }
}
