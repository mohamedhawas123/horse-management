export function getAgeFromDOB(dateString: string): { years: number; months: number } {
    const birthDate = new Date(dateString);
    const now = new Date();
  
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
  
    if (months < 0) {
      years--;
      months += 12;
    }
  
    return { years, months };
  }