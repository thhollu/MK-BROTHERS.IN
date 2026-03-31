export default function handler(req, res) {
  const news = [
    {
      title: "New EV Retrofit Technology Reduces Carbon Emissions",
      source: "EV Daily",
      url: "https://example.com/ev-retrofit",
      publishedAt: "2024-03-01"
    },
    {
      title: "Solar Installation Incentives for Industries 2024",
      source: "Solar World",
      url: "https://example.com/solar-incentives",
      publishedAt: "2024-02-20"
    },
    {
      title: "Industrial Automation Trends: AI & Edge Computing",
      source: "Automation News",
      url: "https://example.com/automation-trends",
      publishedAt: "2024-02-10"
    }
  ];
  res.status(200).json(news);
}