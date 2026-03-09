import { useState } from "react"

export const UseTheme = () => {
    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => setIsDark(prev => !prev);

    return { isDark, toggleTheme }
}
