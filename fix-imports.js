import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to recursively find all .ts and .tsx files
function findTsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findTsFiles(filePath, fileList);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to fix imports in a file
function fixImportsInFile(filePath) {
  console.log(`Processing ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Get relative path from the file to src directory
  const relativePath = path.relative(path.dirname(filePath), path.resolve('./src'));
  const relativePrefix = relativePath === '' ? './' : relativePath.replace(/\\/g, '/') + '/';
  
  // Replace @/... imports with relative paths
  content = content.replace(/from\s+["']@\/(.*?)["']/g, (match, importPath) => {
    const newImportPath = relativePrefix + importPath;
    return `from "${newImportPath}"`;
  });
  
  fs.writeFileSync(filePath, content);
}

// Main function
function main() {
  const srcDir = path.resolve('./src');
  const tsFiles = findTsFiles(srcDir);
  
  console.log(`Found ${tsFiles.length} TypeScript files to process`);
  
  tsFiles.forEach(file => {
    fixImportsInFile(file);
  });
  
  console.log('Import paths fixed!');
}

main(); 