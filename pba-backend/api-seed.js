// Node 18+ has built-in fetch

async function seed() {
  const tours = [
    {
      title: 'Altun Ha & Cave Tubing',
      slug: 'altun-ha-cave-tubing',
      shortDescription: 'Explore ancient ruins and float through caves.',
      description: 'Experience the best of Belize with a visit to the Altun Ha Mayan ruins followed by a refreshing cave tubing adventure.',
      basePriceAdult: 85.0,
      basePriceChild: 65.0,
      currency: 'USD',
      isActive: true
    },
    {
      title: 'Xunantunich & Cave Tubing',
      slug: 'xunantunich-cave-tubing',
      shortDescription: 'Climb El Castillo and tube through crystal caves.',
      description: 'Visit the impressive Xunantunich Mayan site and enjoy a guided cave tubing tour.',
      basePriceAdult: 95.0,
      basePriceChild: 75.0,
      currency: 'USD',
      isActive: true
    },
  ];

  for (const tour of tours) {
    try {
      const res = await fetch('http://localhost:3000/api/admin/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tour),
      });
      if (res.ok) {
        console.log(`Created tour: ${tour.title}`);
      } else {
        console.error(`Failed to create tour: ${tour.title}`, await res.text());
      }
    } catch (err) {
      console.error(`Error creating tour: ${tour.title}`, err);
    }
  }
}

seed();
