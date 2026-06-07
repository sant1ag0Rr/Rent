import fs from 'fs';
import path from 'path';

const directoryPath = path.join(process.cwd(), 'src');

const replacements = {
  'blue-': 'emerald-',
  'indigo-': 'green-',
  'cyan-': 'teal-',
  'purple-': 'emerald-',
  'pink-': 'green-',
  'yellow-': 'lime-',
  'orange-': 'emerald-',
  'blue__gradient': 'blue__gradient' // this is a CSS class we changed inside the CSS but kept the name
};

function replaceColors(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      replaceColors(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content;

      // Only match tailwind classes like text-blue-500, bg-blue-100, border-blue-500, from-blue-500, to-indigo-600
      // Regex to match these specific prefixes: (bg|text|border|ring|from|to|via|shadow|hover:bg|hover:text|focus:ring)-{color}-{number}
      const colorRegex = /(bg|text|border|ring|from|to|via|shadow|hover:bg|hover:text|focus:ring|fill)-(blue|indigo|cyan|purple|pink|yellow|orange)-([1-9][0-9]{1,2}|50)/g;
      
      newContent = newContent.replace(colorRegex, (match, prefix, color, shade) => {
        let newColor = color;
        if (color === 'blue' || color === 'purple' || color === 'orange') newColor = 'emerald';
        if (color === 'indigo' || color === 'pink') newColor = 'green';
        if (color === 'cyan') newColor = 'teal';
        if (color === 'yellow') newColor = 'lime';
        return `${prefix}-${newColor}-${shade}`;
      });
      
      // also match bg-blue-50, text-blue-50, etc which end in 50
      
      // also replace the literal "blue" inside style={{ backgroundColor: "blue" }}
      // wait, we handled some already, but let's do a simple regex for inline styles if needed
      // Actually, standardizing classes is the bulk of it.

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated colors in ${fullPath}`);
      }
    }
  }
}

replaceColors(directoryPath);
console.log("Done replacing colors.");
