import os
import glob
import re

search_path = r'c:\Users\lenovo\Desktop\DIGITAL MARKETING\03_SOFTWARE, AI AND APP DEVELOPMENT\Rarity Projects\01_Clients Projects\Cilex Ibiza\website_alessandra_ibiza\src\**\*.tsx'
files = glob.glob(search_path, recursive=True)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'href="/crea-viaggio"' in content:
        # Avoid modifying Layout.tsx again if it's already modified, but let's check.
        
        # Add import for useFormStore if not present
        if 'useFormStore' not in content:
            # Find the last import
            last_import = content.rfind('import')
            if last_import != -1:
                end_of_line = content.find('\n', last_import)
                content = content[:end_of_line] + '\nimport { useFormStore } from "@/store/useFormStore";' + content[end_of_line:]
            else:
                content = 'import { useFormStore } from "@/store/useFormStore";\n' + content
                
            # Add const { openForm } = useFormStore(); at the beginning of the component
            # We assume the default export or the main function is right after imports.
            # Actually, doing it via regex is hard. Let's just create a wrapper component `CtaButton` 
            # and replace `<Link href="/crea-viaggio" ...> ... </Link>` with `<CtaButton ... />`!
